# Architektur Dokumentation

- [Einführung und Ziele](#einführung-und-ziele)
- [Randbedingungen](#randbedingungen)
- [Kontextabgrenzung](#kontextabgrenzung)
- [Lösungsstrategie](#lösungsstrategie)
- [Bausteinsicht](#bausteinsicht)
- [Laufzeitsicht](#laufzeitsicht)
- [Verteilungssicht](#verteilungssicht)
- [Querschnittsthemen](#querschnittsthemen)
- [Entwurfsentscheide](#entwurfsentscheide)
- [Qualitätsanforderungen](#qualitätsanforderungen)
- [Risiken und technische Schulden](#risiken-und-technische-schulden)
- [Glossar](#glossar)

<!-- TODO: Übersicht über die Problemstellung (Auftrag und Ziel). -->

## Einführung und Ziele

World Quiz ist eine interaktive Webanwendung, mit der Benutzer ihr geographisches Wissen testen und erweitern können. Die Anwendung enthält Quizfragen zu verschiedenen Themen wie Länder, Hauptstädte, Kontinente, Meere und US-Bundesstaaten. Die Benutzer können auch motivierende Statistiken einsehen.

### Anforderungen Übersicht

Siehe [Requirements](./Requirements.md)

### Stakeholders

| **Stakeholder**                               | **Beschreibung**                                                                                          | **Interesse**                                                                                                                                          |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Endbenutzer (registrierte Benutzer)**       | Personen, die sich registrieren, um Quizfragen zu beantworten und ihr geografisches Wissen zu verbessern. | - Benutzerfreundliche, ansprechende und lehrreiche Erfahrung<br>- Fortschritt und Lernziele verfolgen<br>- Auswahl aus verschiedenen Quizthemen        |
| **Administratoren**                           | Personen, die die Verwaltung und Kontrolle der Benutzerkonten und Quizinhalte übernehmen.                 | - Effiziente Verwaltung der Benutzerkonten<br>- Gleiches wie Endbenutzer                                                                               |
| **Entwickler (Backend, Frontend, Fullstack)** | Personen, die für die Programmierung und Architektur der Webanwendung verantwortlich sind.                | - Wartbare, gut strukturierte Codebasis<br>- Optimierte Leistung (schnelle Ladezeiten)<br>- Mobile Optimierung<br>- Sicherheit der Benutzeranmeldungen |

## Randbedingungen

| **Kategorie**                 | **Randbedingungen**                                                                                                                                                                                                                            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Betriebssystem**            | Das Projekt muss auf gängigen Betriebssystemen wie **Linux, macOS und Windows** laufen.                                                                                                                                                        |
| **Programmiersprache**        | Die **Programmiersprache** für das Backend ist **JavaScript** (für Node.js und Express.js) und für das Frontend **TypeScript**, das mit Angular verwendet wird.                                                                                |
| **Framework**                 | Das **Frontend** wird mit **Angular** realisiert, einem beliebten JavaScript-Framework, welches fortlaufend gewartet wird und eine grosse Community hat. Das **Backend** wird mit **Express.js**, einem Web-Framework für Node.js, realisiert. |
| **Datenbank**                 | Die **Datenbank** wird mit der NoSQL-Datenbank **MongoDB** realisiert. Sie ist flexibel bei der Speicherung von JSON-ähnlichen Daten.                                                                                                          |
| **Modul WEB Programming Lab** | Das Projekt ist vom Modul Web Programming Lab, welches im Frühlingssemester 2025 an der Hochschule Luzern durchgeführt wurde.                                                                                                                  |
| **Hosting**                   | Die anwendung wird Lokal must lokal gehosted werden, und mit möglichst wenig aufwand auch auf einem Server Deployed werden können.                                                                                                             |
| **Versionierung**             | Die Versionierung wird mit Git gemacht und der Source Code wird auf Github gehosted.                                                                                                                                                           |
| **Dokumentation**             | Die Dokumentation wird in Markdown geschrieben und ist ebenfalls auf Github ansehbar. gehostet.                                                                                                                                                            |

## Kontextabgrenzung

Das Projekt World Quiz konzentriert sich auf die Entwicklung einer Webanwendung, mit der Benutzer ihr geographisches Wissen testen und erweitern können. Sie umfasst Funktionen wie Benutzerregistrierung, Quizfragen zu verschiedenen geografischen Themen und die Anzeige von Statistiken. Die Anwendung wird lokal gehostet und ist für eine benutzerfreundliche und mobile Nutzung optimiert. Es werden keine externen APIs oder zusätzliche Dienste integriert und die Datenbank für die Speicherung von Benutzerinformationen und Statistiken ist **MongoDB**. Das Projekt konzentriert sich auf die Implementierung der Kernfunktionen, ohne sich mit fortgeschrittenen Themen wie maschinellem Lernen oder tiefgreifender Personalisierung zu befassen.

## Lösungsstrategie

Nach einer umfangreichen Planungsphase wurde zunächst die Grundstruktur des Frontends geschrieben. Ziel ist es, das Quiz unabhängig vom Backend spielen zu können. Danach wurde nach und nach das Backend geschrieben und mit dem Frontend integriert. Anschliessend wurde die Mock-Datenbank im Backend durch die reale Datenbank ersetzt.

## Bausteinsicht

### Level 1

```mermaid
C4Container
  title C4 Model - Context Level
  Person(user, "User", "Interacts with the system")
  Enterprise_Boundary(b1, "World Quiz System") {
    System(system, "World Quiz", "The application")
  }
  Person(admin, "admin", "Interacts with the system and sees database entry")
  Rel(user, system, "Uses")
  Rel(admin, system, "Uses")
```

Es gibt zwei arten von Personen (User und Admin), die mit dem "World Quiz System" interagieren. Der User verwendet die Anwendung, während der Admin zusätzlich die Datenbankeinträge einsehen kann. Das System selbst wird als "World Quiz" dargestellt.

### Level 2

```mermaid
C4Container
  title C4 Model - Context Level
  Person(user, "User", "Interacts with the system")
  Person(admin, "admin", "Interacts with the system and sees database entry")

  Enterprise_Boundary(b1, "World Quiz") {
    System(frontend, "Client", "The frontend of the application")
    System(backend, "Server", "The backend of the application")
    SystemDb(database, "Database", "Stores quiz data")
    System(mongoexpress, "MongoExpress", "Database administration interface")
  }

  Rel(user, frontend, "Uses")
  Rel(admin, frontend, "Uses")
  Rel(frontend, backend, "Communicates with")
  Rel(backend, database, "Reads/Writes data")
  Rel(admin, mongoexpress, "Administers")
  Rel(mongoexpress, database, "Manages")
```

Der User nutzt das Frontend, während der Admin zusätzlich die MongoExpress-Oberfläche zur Verwaltung der Datenbank verwendet. Das Frontend kommuniziert mit dem Backend ("Server"), das die Quizdaten und die Benuzer Daten in der Datenbank speichert und abruft. MongoExpress wird für die Datenbankverwaltung eingesetzt.

### Level 3

#### Client

```mermaid
C4Component
  title Client

  Enterprise_Boundary(b1, "Client") {

    Container(AppComponent, "App Component", "Angular")

    Enterprise_Boundary(b2, "Dashboard Boundry") {

        Component(Dashboard, "Dashboard", "Component")
        Component(Login, "Login", "Component")
        Component(StatsDetail, "Stats Detail", "Component")

        Rel(Dashboard, Login, "Uses")
        Rel(Dashboard, StatsDetail, "Uses")

    }

    Enterprise_Boundary(b3, "Service Boundry") {
        Component(APIService, "API Service", "Service")
        Component(CardService, "Card Service", "Service")
        Component(AuthenticationService, "Authentication Service", "Service")
        Component(QuizService, "Quiz Service", "Service")
    }

    Enterprise_Boundary(b4, "Quiz Boundry") {
        Component(Quiz, "Quiz", "Component")
        Component(QuizManager, "Quiz Manager", "Component")
        Rel(QuizManager, Quiz, "Uses")
    }


    Rel(AppComponent, Dashboard, "Uses")
    Rel(AppComponent, QuizManager, "Uses")



    Rel(Login, AuthenticationService, "Uses")

    Rel(Dashboard, AuthenticationService, "Uses")
    Rel(Dashboard, APIService, "Uses")

    Rel(Quiz, QuizService, "Uses")
    Rel(QuizManager, QuizService, "Uses")
    Rel(QuizManager, CardService, "Uses")
  }
```

Der Client ist eine App Component, die mit dem Dashboard und dem Quiz interagiert. Zusätzlich gibt es Services, die für die Logik, das Einlesen der Daten und die Kommunikation mit dem Server zuständig sind.

Das Quiz besteht aus dem Quiz Manager, in welchem ein Quiz konfiguriert werden kann, welches dann im Quiz gespielt wird.

Das Dashboard besteht aus der Login Component, wenn der Benutzer noch nicht eingeloggt ist und der Stats Component, wenn er eingeloggt ist.

#### Server

```mermaid
C4Component
  title Server Application

  Enterprise_Boundary(b1, "Server") {

    Container(ExpressServer, "Express Server", "Node.js")

    Enterprise_Boundary(b2, "Authentication Boundary") {
        Component(JWTAuthentication, "JWT Authentication", "Middleware")
        Component(Bcryptjs, "Bcryptjs", "Library")
        Rel(ExpressServer, JWTAuthentication, "Uses")
        Rel(JWTAuthentication, Bcryptjs, "Uses")
    }

    Enterprise_Boundary(b3, "Database Boundary") {
        Component(MongoDB, "MongoDB", "Database")
        Component(UserModel, "User Model", "Mongoose Model")
        Component(StatModel, "Stat Model", "Mongoose Model")
        Rel(ExpressServer, MongoDB, "Connects to")
        Rel(MongoDB, UserModel, "Stores data")
        Rel(MongoDB, StatModel, "Stores data")
    }

    Enterprise_Boundary(b4, "API Boundary") {
        Component(RegisterRoute, "Register Route", "API Route")
        Component(LoginRoute, "Login Route", "API Route")
        Component(StatsRoute, "Stats Route", "API Route")
        Component(ProtectedRoute, "Protected Route", "API Route")
        Rel(ExpressServer, RegisterRoute, "Handles request")
        Rel(ExpressServer, LoginRoute, "Handles request")
        Rel(ExpressServer, StatsRoute, "Handles request")
        Rel(ExpressServer, ProtectedRoute, "Handles request")
    }

    Rel(RegisterRoute, UserModel, "Uses")
    Rel(LoginRoute, UserModel, "Uses")
    Rel(LoginRoute, JWTAuthentication, "Uses")
    Rel(StatsRoute, StatModel, "Uses")
    Rel(StatsRoute, JWTAuthentication, "Uses")
    Rel(ProtectedRoute, JWTAuthentication, "Uses")
  }
```

Der Server besteht aus der API, die mit dem Frontend kommuniziert, der Datenbankkomponente und der Authentifizierungskomponente. Die Datenbankkomponente speichert sowohl die Benutzerdaten als auch die Statistiken. Die Authentifizierungskomponente überprüft das Login und ist für die Generierung des Json Web Token verantwortlich.

#### Database

```mermaid
C4Component
  title Database

  Enterprise_Boundary(b1, "Database") {
    Component(UserModel, "User Model", "Mongoose")
    Component(MongoDB, "MongoDB", "Database")
    Component(StatModel, "Stat Model", "Mongoose")

    Rel(MongoDB, UserModel, "Uses")
    Rel(MongoDB, StatModel, "Uses")
  }
```

Die Datenbank besteht aus dem User Model, das den Benutzernamen und das Passwort speichert, und dem Stat Model, das die Statistiken nach jedem Spiel speichert.

## Laufzeitsicht

### Server Login

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant MongoDB
    participant JWT

    Client->>Server: POST /register (username, password)
    Server->>MongoDB: Check if user exists (username)
    MongoDB-->>Server: User not found / User exists
    alt User does not exist
        Server->>MongoDB: Create new user (username, hashed password)
        MongoDB-->>Server: User created
        Server->>Client: Respond with success (userId)
    else Error Occured
        Server->>Client: Respond with error (Username already exists)
    end

    Client->>Server: POST /login (username, password)
    Server->>MongoDB: Find user by username
    MongoDB-->>Server: User data
    Server->>Server: Compare password with bcrypt
    alt Password matches
        Server->>JWT: Create JWT token (userId, username)
        JWT-->>Server: Token
        Server->>Client: Respond with token, userId
    else Password does not match
        Server->>Client: Respond with error (Invalid credentials)
    end
```

Dieses Flussdiagramm zeigt zwei Hauptprozesse: die Registrierung und die Anmeldung eines Benutzers. 

Der Client sendet eine POST-Anfrage mit Benutzername und Passwort an den Server. Der Server überprüft mittels MongoDB, ob der Benutzername bereits existiert. Wenn der Benutzer nicht existiert, wird ein neuer Benutzer mit dem Benutzernamen und dem gehashten Passwort in der Datenbank angelegt und der Server antwortet dem Client mit einer Erfolgsmeldung und der Benutzer-ID. Wenn der Benutzername jedoch bereits existiert, gibt der Server eine Fehlermeldung zurück.

Der Client sendet eine POST-Anfrage mit Benutzername und Passwort an den Server. Der Server holt die Benutzerdaten von MongoDB und vergleicht das eingegebene Passwort mit dem in der Datenbank gespeicherten gehashten Passwort. Stimmt das Passwort überein, erzeugt der Server ein JWT-Token mit der Benutzer-ID und dem Benutzernamen und sendet es zusammen mit der Benutzer-ID an den Client. Stimmt das Passwort nicht überein, gibt der Server die Fehlermeldung „Ungültige Anmeldeinformationen“ zurück.

## Verteilungssicht

```mermaid
C4Deployment
    title Deployment Diagram for Docker Compose Setup

    Enterprise_Boundary(b1, "World Quiz Deployment") {

    Deployment_Node(webserver, "Web Server", "Docker Host") {
        Container(frontend, "Frontend", "Angular", "User interface for interacting with the application.", "4200")
        Container(backend, "Backend", "Node.js API", "Handles business logic and provides REST API.", "3000")
        Container(mongo, "MongoDB", "Database", "Stores data for the application.", "27017")
        Container(mongo-express, "Mongo Express", "Admin Interface", "Web-based admin interface for MongoDB.", "8081")
    }
        Rel(backend, mongo, "Reads from and writes to", "MongoDB")
        Rel(backend, mongo, "Admin access via", "Mongo Express")
        Rel(frontend, backend, "Interacts with", "REST API")
        Rel(mongo-express, mongo, "Connects to", "MongoDB instance")
    }
```

Auf einem Webserver werden vier Container bereitgestellt: der **Frontend Container** (Angular), der die Benutzeroberfläche für die Interaktion mit der Anwendung bereitstellt, der **Backend Container** (Node.js API), der die Geschäftslogik verarbeitet und eine REST API bereitstellt, der **MongoDB Container**, der die Daten der Anwendung speichert, und der **Mongo Express Container**, der eine webbasierte Administrationsoberfläche für MongoDB bereitstellt. Der Backend-Container kommuniziert mit der MongoDB für Datenoperationen und hat auch administrativen Zugriff auf die Datenbank über Mongo Express. Das Frontend interagiert mit dem Backend über die REST API und Mongo Express verbindet sich direkt mit MongoDB für die Administration. Diese Konfiguration gewährleistet eine gut strukturierte und skalierbare Anwendung.

### API

| Methode | Endpoint         | Beschreibung                                                                                          |
|---------|------------------|-------------------------------------------------------------------------------------------------------|
| POST    | /register        | Registriert einen neuen Benutzer mit `username` und `password`. Gibt eine Erfolgsmeldung und Benutzer-ID zurück. |
| POST    | /login           | Meldet einen Benutzer an, indem `username` und `password` überprüft werden. Gibt ein JWT-Token für die Authentifizierung zurück. |
| GET     | /protected       | Ein geschützter Endpunkt, der ein gültiges JWT-Token erfordert. Ist für das Testen vom JWT gedacht. |
| POST    | /stats           | Speichert Benutzerdaten wie `front`, `back`, `attempts`, `date` und `tags`. Erfordert ein JWT-Token. |
| GET     | /stats/latest    | Ruft die letzten 100 Statistiken für den authentifizierten Benutzer ab. Erfordert ein JWT-Token. |

## Querschnittsthemen

- Sicherheit: Ein zentrales Querschnittsthema ist die Sicherheit der Anwendung. Dies umfasst die Implementierung von Authentifizierungsmechanismen wie JWT (JSON Web Tokens) für die Benutzeranmeldung sowie die sichere Speicherung und Verarbeitung von Passwörtern (mittels Bcrypt). Die Datensicherheit wird durch den Zugriffsschutz der MongoDB-Datenbank und die Verwendung verschlüsselter Verbindungen beim Datenaustausch gewährleistet.

- Performance: Für eine gute Performance müssen sowohl das Frontend als auch das Backend optimiert werden. Dies betrifft vor allem die Ladezeiten des Frontends sowie die schnelle und effiziente Datenabfrage im Backend. Hier spielt MongoDB als NoSQL-Datenbank eine Rolle, da sie schnell und flexibel auf grosse Datenmengen zugreifen kann.

- Fehlerbehandlung und Protokollierung: Ein weiteres Querschnittsthema ist die robuste Fehlerbehandlung. Fehler müssen im Backend korrekt behandelt und an den Client kommuniziert werden. Auch ein aussagekräftiges Logging, insbesondere in der Backend-API, ist notwendig, um Probleme schnell identifizieren und beheben zu können.

- Usability und Barrierefreiheit: Ein benutzerfreundliches Design ist für das Frontend von grosser Bedeutung. Insbesondere sollten die Quizfragen für den Nutzer klar verständlich und die Benutzeroberfläche intuitiv bedienbar sein. Einfache Interaktionen und Feedback-Mechanismen sind notwendig, damit der Nutzer schnell zu den gewünschten Informationen gelangt.

## Entwurfsentscheide

### Quiz Logik im Client vs. Server

Während der Entwicklung wurde entschieden, dass die Quizfragen im Backend und nicht im Frontend geladen werden. Diese Entscheidung hat mehrere Konsequenzen: Einerseits bedeutet dies, dass die Quizfragen im Frontend nicht mehr benutzerspezifisch abgerufen werden können oder dies zumindest erschwert wird. Andererseits führt diese Architektur zu einer geringeren Abhängigkeit des Frontends vom Backend. Diese Unabhängigkeit ermöglicht es, das Quiz auch dann zu spielen, wenn keine stabile Verbindung zum Backend besteht, was die Flexibilität und Benutzerfreundlichkeit erhöht. Diese Entscheidung berücksichtigt also sowohl die Benutzererfahrung als auch die Robustheit des Systems.

## Qualitätsanforderungen

Siehe [Requirements](./Requirements.md)

## Risiken und technische Schulden

- Technische Schulden: Diese entstehen oft durch schnelle und nicht nachhaltige Implementierungen. Ein Beispiel in diesem Projekt könnte der schnelle Wechsel von einer Mock-Datenbank zu einer echten MongoDB-Datenbank sein, ohne ausreichende Testabdeckung oder Performancetests durchzuführen. Solche Entscheidungen können später zu unerwarteten Problemen wie Dateninkonsistenzen oder Performanceeinbussen führen.

- Komplexität des Systems: Die Implementierung mehrerer Schichten (Frontend, Backend, Datenbank) und deren Kommunikation kann die Komplexität erhöhen. Dies bedeutet, dass mit zunehmender Funktionalität die Wartung schwieriger wird, wenn nicht regelmässig Refaktorisierungen und Optimierungen durchgeführt werden.

- Skalierbarkeit: Das System ist derzeit auf eine lokale Umgebung ausgerichtet, was die Skalierbarkeit einschränken könnte, insbesondere wenn die Anzahl der Nutzer stark ansteigt. Ein Risiko ist die mögliche Verschlechterung der Performance bei hoher Last, wenn keine ausreichenden Massnahmen zur Lastverteilung oder Caching-Techniken implementiert werden.

- Abhängigkeiten: Abhängigkeiten von Drittanbietern, wie z.B. MongoDB und MongoExpress, können zu Risiken führen, wenn zukünftige Versionen inkompatibel sind oder Sicherheitslücken aufweisen. Daher ist es wichtig, regelmässige Updates und Tests durchzuführen, um diese Risiken zu minimieren.

- Sicherheit: Ein weiteres Risiko ist die mangelnde Absicherung von Daten und APIs. Wenn Sicherheitsmechanismen wie JWT oder Passwortschutz nicht korrekt implementiert oder gewartet werden, kann dies zu unberechtigten Zugriffen und Datenlecks führen.

### Reflextion

Ich habe bei diesem Projekt viel über das Frontend gelernt, vor allem über TypeScript, JWT und Angular. Es war eine Herausforderung mit JavaScript oder TypeScript im Backend zu arbeiten, da ich lieber mit vertrauten Technologien wie Java oder Python gearbeitet hätte. So hätte ich die gewonnene Zeit im Frontend nutzen können. 

Trotzdem war es eine wertvolle Erfahrung, da ich gezwungen war, neue Konzepte und Frameworks zu lernen. Besonders spannend fand ich die Arbeit mit APIs, MongoDB und JSON-Datenmodellen sowie die Implementierung der JWT-Authentifizierung. Dies hat mein Verständnis für Websicherheit und Benutzerdatenmanagement vertieft. 

Obwohl das Backend nicht meine bevorzugte Sprache war, habe ich viel darüber gelernt, wie man APIs strukturiert und Datenbanken verwaltet. Die Arbeit mit Angular und die Integration von Frontend und Backend haben mir geholfen, meine Fähigkeiten in der Entwicklung von interaktiven Webanwendungen zu verbessern. Alles in allem hat mir das Projekt geholfen, meine Webentwicklungsfähigkeiten zu erweitern und neue Technologien zu entdecken.

Ich freue mich schon, nach dem Web Lab Modul an diesem Projekt weiter arbeiten zu können.

## Glossar

| Term | Definition |
| ---- | ---------- |
| x    | x          |
