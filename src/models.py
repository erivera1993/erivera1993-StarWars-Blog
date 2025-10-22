from __future__ import annotations
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(200), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)

    # One User -> Many Favorites
    favorites: Mapped[list[Favorite]] = relationship(
        "Favorite", back_populates="user", cascade="all, delete-orphan"
    )

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, it's a security breach
        }


class Character(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    gender: Mapped[str] = mapped_column(String(50))
    birth_year: Mapped[str] = mapped_column(String(20))
    eye_color: Mapped[str] = mapped_column(String(30))

    # One Character -> Many Favorites
    favorites: Mapped[list[Favorite]] = relationship(
        "Favorite", back_populates="character", cascade="all, delete-orphan"
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "gender": self.gender,
            "birth_year": self.birth_year,
            "eye_color": self.eye_color,
        }


class Planet(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    climate: Mapped[str] = mapped_column(String(100))
    terrain: Mapped[str] = mapped_column(String(100))
    population: Mapped[str] = mapped_column(String(100))

    # One Planet -> Many Favorites (users can favorite planets)
    favorites: Mapped[list[Favorite]] = relationship(
        "Favorite", back_populates="planet", cascade="all, delete-orphan"
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "climate": self.climate,
            "terrain": self.terrain,
            "population": self.population
        }


class Favorite(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    character_id: Mapped[int] = mapped_column(
        ForeignKey("character.id"), nullable=True)
    planet_id: Mapped[int] = mapped_column(
        ForeignKey("planet.id"), nullable=True)
    vehicle_id: Mapped[int] = mapped_column(
        ForeignKey("vehicle.id"), nullable=True)

    # Many Favorites -> One User / Character / Planet
    user: Mapped[User] = relationship("User", back_populates="favorites")
    character: Mapped[Character | None] = relationship(
        "Character", back_populates="favorites"
    )
    planet: Mapped[Planet | None] = relationship(
        "Planet", back_populates="favorites"
    )
    vehicle: Mapped[Vehicle | None] = relationship(
        "Vehicle", back_populates="favorites"
    )

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "character_id": self.character_id,
            "planet_id": self.planet_id
        }


class Vehicle(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    model: Mapped[str] = mapped_column(String(100))
    manufacturer: Mapped[str] = mapped_column(String(100))
    vehicle_class: Mapped[str] = mapped_column(String(100))
    crew: Mapped[str] = mapped_column(String(50))
    passengers: Mapped[str] = mapped_column(String(50))

    favorites: Mapped[list[Favorite]] = relationship(
        "Favorite", back_populates="vehicle", cascade="all, delete-orphan"
    )

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "model": self.model,
            "manufacturer": self.manufacturer,
            "vehicle_class": self.vehicle_class,
            "crew": self.crew,
            "passengers": self.passengers
        }
