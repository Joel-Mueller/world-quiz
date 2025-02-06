# Konzept

> [!NOTE]
> This is only a draft and not the final documentation

## Api

### start game

to server to start game (post)

- front
- back
- tag[]
- daily boolean
  back
- gameID

from server question (get)

- gameID
- front
- back
- question number

Tag:
EUROPE = 1
ASIA = 2
OCEANIA = 3
NORTH_AMERICA = 4
SOUTH_AMERICA = 5
AFRICA = 6
OCEANS_AND_SEAS = 7
CONTINENTS = 8
US_STATES = 9
Canada_STATES = 10
SWITZERLAND_CANTON = 11
AUSTRALIA_STATES = 12

Category:
NAME = 1
CAPITAL = 2
FLAG = 3
MAP = 4
NAME_AND_CAPITAL = 5

back to server (post)

- gameID
- guessed
- question number

## Store for each user

Game

- tag, front, back, cards

## Modules backend

Game Manager
Gateway
Game selecter (sucht alle cards)
CSV loader
DBConnector
Stats generator
