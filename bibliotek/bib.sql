CREATE TABLE laaner 
(
    laanerid serial primary key,
    fornavn text not null,
    etternavn text not null,       
    adresse text,
    epost text,
    tlf text,
    kjonn text
);

CREATE TABLE bok
(
    bokid serial primary key,
    tittel text not null,
    forfatterid int,
    isbn text,
    antallSider int,
    pdato date,
    spraak text,
    sjanger text 
);

CREATE TABLE forfatter 
(
    forfatterid serial primary key,
    fornavn text not null,
    etternavn text not null,
    fdato date,
    kjønn text
);

CREATE TABLE eksemplar
(
    eksemplarid serial primary key,
    tilstand text,
    bokid int
);

CREATE TABLE utlaan
(
    utlaanid serial primary key,
    udato date,
    innlevert text default 'nei',
    laanerid int,
    eksemplarid int
);

-- Fremmednøkler nederst
-- Kopien av key på mange-siden
