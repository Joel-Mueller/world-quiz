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

### Anforderungen Übersicht

Siehe [Requirements](./Requirements.md)

### Qualitätsziele



### Stakeholders

<!-- TODO: Randbedingungen, welche bei der Lösung eingehalten werden müssen, z.B. bestehende Systeme, welche unterstützt werden müssen oder spezielle Anforderungen, welche den Lösungsraum einschränken. -->

## Randbedingungen

<!-- TODO: Anhand von Datenflüssen beschreiben wie das zu entwickelnde System eingesetzt wird.
Also Daten, welche Benutzer oder umgebende Systeme in das zu entwickelnde System einspeisen oder abgreifen.
Diese Beschreibung wird oft von einem Diagramm unterstützt, Dieses Diagram ist in VSK pflicht!
Hinweis: Hier Benutzerschnittstellen und externe Schnittstellen mit Version spezifizieren. -->

## Kontextabgrenzung

### Business Context

<!--

**<Diagram or Table>**

**<optionally: Explanation of external domain interfaces>**

-->

### Technical Context

<!--

**<Diagram or Table>**

**<optionally: Explanation of technical interfaces>**

**<Mapping Input/Output to Channels>**

-->

<!-- TODO: Gewählter Lösungsansatz mit Begründung beschreiben. Gefragt ist eine sehr kurze Zusammenfassung. -->

## Lösungsstrategie

<!-- TODO: Beschreibung der Bausteinsicht hinzufügen. Für VSK obligatorisch.
In Fall von VSK möchten wir alle vier Ebenen des C4-Modells sehen (Diagramme aber kein Code).
Zu allen Diagrammen wird eine Beschreibung erwartet. -->

## Bausteinsicht

### Whitebox Overall System

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

## Laufzeitsicht

<!--

### <Runtime Scenario 1>

* _<insert runtime diagram or textual description of the scenario>_
* _<insert description of the notable aspects of the interactions between the
building block instances depicted in this diagram.

-->

<!-- TODO: Beschreibung der Zuordnung von Komponenten zu den Systemen, auf welchen diese eingesetzt werden (auch genannt Deployment- oder Zielsysteme) sowie die Anforderungen an diese Zielsystem(e). Ggf. verschiedene Szenarios. -->

## Verteilungssicht

### Infrastructure Level 1

<!--
_**<Overview Diagram>**_

Motivation

_<explanation in text form>_

Quality and/or Performance Features

_<explanation in text form>_

Mapping of Building Blocks to Infrastructure
_<description of the mapping>_
-->

### Infrastructure Level 2

<!--

#### _<Infrastructure Element 1>_

_<diagram + explanation>_

#### _<Infrastructure Element 2>_

_<diagram + explanation>_

...

#### _<Infrastructure Element n>_

_<diagram + explanation>_
-->

<!-- TODO: Konzepte, welche mehrere Komponenten betreffen (z.B. Schnittstellen, Datenmodell, Testing, Sicherheit) beschreiben.
Hinweise:
- Hier die proprietäre Schnittstelle zwischen LoggerComponent und LoggerServer dokumentieren.
- Hier die Teststrategie dokumentieren (ca. ½ A4-Seite):
- Auf welchem Level (System, Komponente, Unit) wird welche Funktionalität getestet mit Begründung der Wahl.
- Welche Funktionalität wird automatisch getestet und welche manuell mit Begründung der Wahl.
- Welche Funktionalität wird nicht getestet mit Begründung, warum dies kein Problem ist.
- Zusätzliche Informationen, z.B. ob und für welche Funktionalitäten Test-First eingesetzt wird mit Begründung. -->

## Querschnittsthemen

<!--
### _<Concept 1>_

_<explanation>_



### _<Concept 2>_

_<explanation>_

...

### _<Concept n>_

_<explanation>_
-->

<!-- TODO: Entwurfsentscheide auflisten.
Hinweis: Hier die verwendeten Patterns (z.B. Adapter, Strategy) dokumentieren (jeweils mit Diagramm und kurzer Beschreibung).
-->

## Entwurfsentscheide

<!-- TODO: Beschreibung (als Auflistung) der Umsetzung von bekannten und relevanten «nicht funktionalen»-Anforderungen an das zu entwickelnde System.
 Beispiele:
 - Wie garantieren Sie das Ihr System die Antwort (Reply) zu einer Anforderung (Request) innerhalb von maximal 100ms versendet?
 - Wie garantieren Sie, dass Ihr System eine Verfügbarkeit von 99.9% hat?
 - Wie garantieren Sie das Nachrichten, welche vom System, erhalten werden nicht verloren gehen?
 - usw. -->

## Qualitätsanforderungen

### Quality Tree

### Quality Scenarios

<!-- TODO: Listen Sie hier Entscheidungen zu Architektur, Design, Modularisierung, Implementation, und Testing auf, welche später zu Problemen, Einschränkungen oder Mehraufwand in der Verwendung oder Weiterentwicklung der Umsetzung führen können. -->

## Risiken und technische Schulden

## Glossar

| Term | Definition |
| ---- | ---------- |
| x    | x          |
