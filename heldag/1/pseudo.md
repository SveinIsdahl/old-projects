pseudokode for skjema
 ````

deklarerer divElements
    selectDiv
    oppdragSelector
    komboboks
    ledig/uledig div


objekt med alle oppdrag = oppdrag bokstav som key og beksrivelse som property
ansattObjekt =  alle ansatte som keys og deres oppdrag som strings

Gjør ansattObjekt om til array med ansatte
lag select med alle ansatteArray

eventlistener på select:
    const valgtAnsatt 
    oppdrag = ansatt sitt oppdrag i ansattObjekt
        lag om string til array

    Dersom antallOppdrag er null
        ledigDiv tekst = "ledig
    Dersom antallOppdrag > 3
        ledigDiv = "opptatt"

    lag ny select fra arrayet
        I denne select skal oppdrag vises med bokstaver
        Dersom(antallOppdrag = 0)
            komboboksDiv fjernes
        Dersom(antallOppdrag >3)
            komboboks vises med info
        else
            komboboks vises med info
    
````

