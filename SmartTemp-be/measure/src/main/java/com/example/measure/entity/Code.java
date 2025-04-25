package com.example.measure.entity;

public enum Code {
    SUCCESS("Operacja zakończona sukcesem"),

    // Kody z literą "S" do sensorów, a "D" do data
    S1("Czujnik o podanej nazwie juz istnieje"),
    S2("Czujnik o podanej nazwie nie istnieje"),

    S3("Tryb nie istnieje");

    public final String label;
    private Code(String label){
        this.label = label;
    }
}
