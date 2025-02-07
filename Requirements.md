# Requirements

[Auftrag](https://github.com/web-programming-lab/web-programming-lab-projekt)

## Kontext

World Quiz ermöglicht es den Benutzern, ihr Wissen über Länder, Hauptstädte, Kontinente, Meere, US-Bundesstaaten und andere geografische Themen zu verbessern. Die Nutzer können sich registrieren und jedes beliebige Quiz spielen. Das System enthält auch Gamification-Elemente wie Erfolge und tägliche Herausforderungen, ähnlich wie [Duolingo](https://www.duolingo.com).
Es gibt zwei Arten von Benutzern:

- Registrierte **Benutzer**: Können Quizfragen beantworten, Statistiken einsehen und ihren Lernfortschritt verfolgen.
- **Administratoren**: Können sich ebenfalls anmelden, Quizfragen spielen und Benutzerkonten verwalten und einsehen.

## Anforderungen

### Fachliche Anforderungen

#### User Story 1: Registrierung und Anmeldung (Prio 'Must')

Ich möchte mich als Benutzer registrieren und anmelden können, um das Quiz zu spielen, meinen Fortschritt zu speichern und meine Statistiken einzusehen.

**Akzeptanzkriterien**

- Die Registrierung erfordert einen Benutzernamen, eine E-Mail-Adresse und ein Passwort.
- Die Anmeldung erfolgt mit E-Mail-Adresse und Passwort.
- Falsche Anmeldedaten verhindern den Zugang.
- Nach erfolgreicher Anmeldung wird der Benutzer zum Quiz-Dashboard weitergeleitet.
- Die Anmeldedaten werden in einer Datenbank gespeichert

#### User Story 2: Quiz spielen (Prio 'Must')

Als Benutzer möchte ich Quizfragen beantworten, um mein geographisches Wissen zu verbessern.

**Akzeptanzkriterien**

- Der Benutzer kann die Quizfragen frei wählen (Karte, Länder, Hauptstädte, Meere, US-Bundesstaaten, etc.)
- Der Benutzer kann die Fragen nach Kontinenten gruppieren, so dass ein bestimmter Kontinent gelernt werden kann.
- Die Fragen sind wie Karteikarten und der Benutzer muss dann angeben, ob er sie kennt oder nicht.

#### User Story 3: Statistiken einsehen (Prio 'Could')

Als Benutzer möchte ich meine Fortschritte und Statistiken sehen, um meine Leistung zu verfolgen.

**Akzeptanzkriterien**

- Die Gesamtzahl der beantworteten Fragen wird angezeigt.
- Richtige und falsche Antworten werden nach jedem Quiz angezeigt.
- Es gibt tägliche, wöchentliche und monatliche Statistiken.
- Gamification-Elemente wie Streaks oder Badges werden angezeigt.
- Die Statistiken werden in die Datenbank gespeichert und herausgelesen

#### User Story 4: Administratoren-Anmeldung (Prio 'Should')

Ich möchte mich als Administrator einloggen können, um Zugriff auf zusätzliche Funktionen zu erhalten.

**Akzeptanzkriterien**

- Die Anmeldung erfolgt über E-Mail und Passwort.
- Nur Admins haben Zugang zu administrativen Funktionen.
- Administratoren können sich auch als normale Benutzer einloggen und Quizfragen beantworten.

#### User Story 5: Wiederholung nicht gewusster Fragen (Priorität: 'Should')

Als Benutzer möchte ich, dass Fragen, die ich nicht richtig beantwortet habe, nach einer bestimmten Zeit erneut gestellt werden, um einen maximalen Lerneffekt zu erzielen.

**Akzeptanzkriterien**

- Falsch beantwortete Fragen werden nach einem festgelegten Zeitintervall wiederholt.
- Die Wiederholung erfolgt nach einem gestaffelten Intervall ähnlich wie bei [Anki](https://apps.ankiweb.net) (z.B. 1 Minute, 10 Minuten, 1 Tag, 1 Woche, 1 Monat usw.)

#### User Story 6: Gamification-Elemente (Prio 'Could')

Als Nutzer möchte ich Abzeichen und Auszeichnungen erhalten, um meine Motivation zu steigern.

**Akzeptanzkriterien**

- Nutzer erhalten Abzeichen für Meilensteine (z.B. „10 Tage hintereinander gespielt“).
- Es gibt ein Punktesystem für richtige Antworten.
- Die Nutzer können sich in einer Rangliste vergleichen.

### Qualitätsanforderungen

- Die Quiz-Seite muss innerhalb von 1 Sekunde geladen werden.
- Die Webanwendung muss für mobile Geräte optimiert sein.
- Alle Anmeldungen und Änderungen an Benutzerkonten werden protokolliert.

## Technologie Stack

Note: Der Technologie Stack kann im Verlauf vom Projekt noch geändert werden

- [Angular](https://angular.dev/) (Front End)
- [MongoDB](https://www.mongodb.com/) (Datenbank)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (Deployment)
- [NodeJS](https://nodejs.org/en) (Backend)
- [ExpressJS](https://expressjs.com/) (Backend RestAPI)
