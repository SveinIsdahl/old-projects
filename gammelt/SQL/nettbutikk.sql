create table kunde (
    kundeid serial primary key,
    fornavn text not null,
    etternavn text not null,
    adresse text,
    epost text,
    tlf text,
    vareid int references vare (vareid)
);

create table vare (
    vareid serial primary key,
    antall int,
    pris int
);

