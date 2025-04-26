# Smart Temp 🌡️ - system do monitorowania i sterowania temperaturą (IoT)

### Autorzy wykonanego projektu: 
* [Remigiusz Janicki](https://github.com/TheRemekk) 
* [Wojciech Gunia](https://github.com/wojciechgunia)

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

### 🔐 [Ekran logowania](#image1)

#### <a id="image1"></a>
![Ekran logowania](SmartTemp-fe/images/logowanie.png)

### 📊 [Wykres danych w czasie rzeczywistym](#image2)

#### <a id="image2"></a>
![Wykres danych w czasie rzeczywistym](SmartTemp-fe/images/wykres.png)

### 🔧 [Panel sterowania urządzenia](#image3)

#### <a id="image3"></a>
![Panel sterowania urządzenia](SmartTemp-fe/images/panel.png)

### 💻 [Widok całej aplikacji](#image4)

#### <a id="image4"></a>
![Widok całej aplikacji](SmartTemp-fe/images/full_view.png)


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
