# Smart Temp - system do monitorowania i sterowania temperaturą (IoT)

Aplikacja internetowa utworzona z wykorzystaniem środowiska [Angular CLI](https://github.com/angular/angular-cli) wersji 15 oraz [Java Spring Boot](https://github.com/spring-projects/spring-boot) na wersji 3.1 umożliwiająca użytkownikowi intuicyjne monitorowanie oraz zdalne sterowanie systemem IoT. 

## Spis treści

1. [Opis projektu](#l1)
2. [Interfejs użytkownika](#l2)
3. [Struktura projektu](#l3)

<a id="l1"></a>
## Opis projektu

Interfejs webowy zawierający interaktywny wykres, który umożliwia przegląd temperatury, wilgotności oraz poziomu grzania zarówno w czasie rzeczywistym, jak i z dowolnie wybranego przedziału czasowego. Dane zbierane są przez czujniki podłączone do mikrokontrolera, który przesyła je co minutę połączeniem Wi-Fi do urządzenia Raspberry Pi, które pełni rolę lokalnego serwera. Odczytane parametry są zapisywane w relacyjnej bazie danych PostgreSQL uruchomionej w kontenerze Docker.


<a id="l2"></a>
## Interfejs użytkownika

🔐 Ekran logowania

![Logowanie](frontend/images/logowanie.png)

📊 Wykres danych w czasie rzeczywistym

![Wykres](frontend/images/wykres.png)

🔧 Panel sterowania urządzenia

![Panel](frontend/images/panel.png)

<a id="l3"></a>
## Struktura projektu
