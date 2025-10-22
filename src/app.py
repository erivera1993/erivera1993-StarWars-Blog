import os
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from utils import APIException, generate_sitemap
from admin import setup_admin
from models import db, User, Character, Planet, Favorite, Vehicle

app = Flask(__name__)
app.url_map.strict_slashes = False

db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

MIGRATE = Migrate(app, db)
db.init_app(app)
CORS(app)
setup_admin(app)


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


@app.route('/')
def sitemap():
    return generate_sitemap(app)


def get_current_user_id():
    uid = request.headers.get("X-User-Id") or request.args.get("user_id") or 1
    try:
        return int(uid)
    except ValueError:
        raise APIException("Invalid user id", status_code=400)


def not_found(entity="resource"):
    raise APIException(f"{entity} not found", status_code=404)


@app.get("/character")
def list_character():
    character = Character.query.all()
    return jsonify([p.serialize() for p in character]), 200


@app.post("/character")
def create_character():
    data = request.get_json()
    if not data or "name" not in data:
        raise APIException("Missing required field: name", status_code=400)


@app.get("/character/<int:character_id>")
def get_person(character_id):
    person = Character.query.get(character_id)
    if not person:
        return not_found("person")
    return jsonify(person.serialize()), 200


@app.get("/planets")
def list_planets():
    planets = Planet.query.all()
    return jsonify([pl.serialize() for pl in planets]), 200


@app.get("/planets/<int:planet_id>")
def get_planet(planet_id):
    planet = Planet.query.get(planet_id)
    if not planet:
        return not_found("planet")
    return jsonify(planet.serialize()), 200


@app.get("/vehicles")
def list_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([v.serialize() for v in vehicles]), 200


@app.get("/vehicles/<int:vehicle_id>")
def get_vehicle(vehicle_id):
    vehicle = Vehicle.query.get(vehicle_id)
    if not vehicle:
        raise APIException("vehicle not found", status_code=404)
    return jsonify(vehicle.serialize()), 200


@app.get("/users")
def list_users():
    users = User.query.all()
    return jsonify([u.serialize() for u in users]), 200


@app.get("/users/favorites")
def user_favorites():
    user_id = get_current_user_id()
    favs = Favorite.query.filter_by(user_id=user_id).all()
    result = []
    for f in favs:
        item = f.serialize()
        if f.planet_id:
            planet = Planet.query.get(f.planet_id)
            item["planet"] = planet.serialize() if planet else None
        if f.character_id:
            person = Character.query.get(f.character_id)
            item["character"] = person.serialize() if person else None
        result.append(item)
    return jsonify(result), 200


@app.post("/favorite/planet/<int:planet_id>")
def add_favorite_planet(planet_id):
    user_id = get_current_user_id()
    planet = Planet.query.get(planet_id)
    if not planet:
        return not_found("planet")
    exists = Favorite.query.filter_by(
        user_id=user_id, planet_id=planet_id).first()
    if exists:
        raise APIException("Planet already in favorites", status_code=400)
    fav = Favorite(user_id=user_id, planet_id=planet_id)
    db.session.add(fav)
    db.session.commit()
    return jsonify(fav.serialize()), 201


@app.post("/favorite/character/<int:character_id>")
def add_favorite_person(character_id):
    user_id = get_current_user_id()
    person = Character.query.get(character_id)
    if not person:
        return not_found("person")
    exists = Favorite.query.filter_by(
        user_id=user_id, character_id=character_id).first()
    if exists:
        raise APIException("Person already in favorites", status_code=400)
    fav = Favorite(user_id=user_id, character_id=character_id)
    db.session.add(fav)
    db.session.commit()
    return jsonify(fav.serialize()), 201


@app.delete("/favorite/planet/<int:planet_id>")
def delete_favorite_planet(planet_id):
    user_id = get_current_user_id()
    fav = Favorite.query.filter_by(
        user_id=user_id, planet_id=planet_id).first()
    if not fav:
        return not_found("favorite planet")
    db.session.delete(fav)
    db.session.commit()
    return jsonify({"msg": "Favorite planet removed"}), 200


@app.delete("/favorite/character/<int:character_id>")
def delete_favorite_person(character_id):
    user_id = get_current_user_id()
    fav = Favorite.query.filter_by(
        user_id=user_id, character_id=character_id).first()
    if not fav:
        return not_found("favorite person")
    db.session.delete(fav)
    db.session.commit()
    return jsonify({"msg": "Favorite person removed"}), 200


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=False)
