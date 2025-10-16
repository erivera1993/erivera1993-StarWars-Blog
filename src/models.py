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
    planet_id: Mapped[int] = mapped_column(ForeignKey("planet.id"))

    # Many Characters -> One Planet
    planet: Mapped[Planet] = relationship(
        "Planet", back_populates="characters")

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
            "planet_id": self.planet_id
        }


class Planet(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    climate: Mapped[str] = mapped_column(String(100))
    terrain: Mapped[str] = mapped_column(String(100))
    population: Mapped[str] = mapped_column(String(100))

    # One Planet -> Many Characters
    characters: Mapped[list[Character]] = relationship(
        "Character", back_populates="planet"
    )

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

    # Many Favorites -> One User / Character / Planet
    user: Mapped[User] = relationship("User", back_populates="favorites")
    character: Mapped[Character | None] = relationship(
        "Character", back_populates="favorites"
    )
    planet: Mapped[Planet | None] = relationship(
        "Planet", back_populates="favorites"
    )

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "character_id": self.character_id,
            "planet_id": self.planet_id
        }
