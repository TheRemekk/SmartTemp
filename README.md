[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/TheRemekk/SmartTemp/blob/master/README-en.md)

# Smart Temp 🌡️ - system do monitorowania i sterowania temperaturą (IoT)

### Autorzy wykonanego projektu: 
<img src="https://skillicons.dev/icons?i=github" height="25" alt="github logo"/> [Remigiusz Janicki](https://github.com/TheRemekk)<br>
<img src="https://skillicons.dev/icons?i=github" height="25" alt="github logo"/> [Wojciech Gunia](https://github.com/wojciechgunia)

## 📖 Spis treści

1. [Opis projektu](#l1)
2. [Technologie i funkcjonalności](#l2)
3. [Interfejs użytkownika](#l3)
4. [Struktura projektu](#l4)

<a id="l1"></a>

## 📋 Opis projektu
Aplikacja internetowa utworzona z wykorzystaniem środowiska [Angular CLI](https://github.com/angular/angular-cli) wersji 15 oraz [Java Spring Boot](https://github.com/spring-projects/spring-boot) na wersji 3.1 umożliwiająca użytkownikowi intuicyjne monitorowanie oraz zdalne sterowanie systemem IoT. 

Interfejs zawiera interaktywny wykres, który umożliwia przegląd temperatury, wilgotności oraz poziomu grzania zarówno w czasie rzeczywistym, jak i z dowolnie wybranego przedziału czasowego. Dane zbierane są przez czujniki podłączone do mikrokontrolera, który przesyła je co minutę połączeniem Wi-Fi do urządzenia Raspberry Pi, które pełni rolę lokalnego serwera. Odczytane parametry są zapisywane w relacyjnej bazie danych.

<a id="l2"></a>

## ⚙️ Technologie i funkcjonalności 
* Angular CLI: Narzędzie do budowy frontendu, umożliwiające szybkie tworzenie aplikacji webowych.
* Spring Boot: Framework wykorzystywany do stworzenia backendu oraz obsługi API REST, zapewniający łatwą konfigurację i integrację z różnymi technologiami. 
* JPA (Java Persistence API) z Hibernate: Użyte do mapowania obiektów Java na rekordy w bazie danych, co umożliwia wygodne zarządzanie danymi.
* Flyway: Narzędzie do automatyzacji migracji schematów bazy danych, umożliwiające łatwe zarządzanie zmianami struktury bazy danych w ramach aplikacji.
* Docker: Stosowany do uruchamiania bazy danych PostgreSQL w kontenerze, co zapewnia izolację środowiska oraz łatwą konfigurację i przenośność aplikacji.

<a id="l3"></a>
## 🖥️ Interfejs użytkownika 

<details>
  <summary>🔐 Ekran logowania</summary>
  <img src="SmartTemp-fe/images/logowanie.png" alt="Ekran logowania"/>
</details>

<details>
  <summary>📊 Wykres danych w czasie rzeczywistym</summary>
  <img src="SmartTemp-fe/images/wykres.png" alt="Wykres danych w czasie rzeczywistym"/>
</details>

<details>
  <summary>🔧 Panel sterowania urządzenia</summary>
  <img src="SmartTemp-fe/images/panel.png" alt="Panel sterowania urządzenia"/>
</details>

<details>
  <summary>💻 Widok całej aplikacji</summary>
  <img src="SmartTemp-fe/images/full_view.png" alt="Widok całej aplikacji"/>
</details>


<a id="l4"></a>
## 🧩 Struktura projektu 

Poniżej przedstawiona jest uproszczona struktura **backendu** wykonanego z użyciem Spring Boot Framework, który zarządza danymi przesyłanymi z urządzenia Raspberry Pi:

```text
📂 SmartTemp # Pliki projektowe
|_📂 SmartTemp-be   # Sekcja backend
  |_📂 auth     # Moduł odpowiadający za autoryzację (konieczna aby skorzystać z interfejsu)
    📂 eureka   # Moduł który dynamicznie rejestruje i lokalizuje usługi w systemie mikroserwisów
    📂 gatway   # Moduł służący do zarządzania bramą API, kierując ruch do odpowiednich usług
    📁 measure  # Moduł odpowiadający za zarządzanie pomiarami oraz czujnikami
    📁 RegisterEndpointInformation  # Moduł do rejestracji dostępnych endpointów 
    📄 .gitignore
```
