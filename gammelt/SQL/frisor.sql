create table kunde(
    kundeid serial primary key,
    fornavn text not null,
    etternavn text not null,
    kjonn text default 'f' check (
    kjonn = 'f'
    or kjonn = 'm'
    )
);

create table frisor(
    frisorid serial primary key,
    fornavn text not null,
    etternavn text not null,
    mobil text
);

create table klipp(
    klippid serial primary key,
    kilpptime date not null,
    betalt text,
    pris int,
    frisorid int references frisor (frisorid),
    kunde int references kunde (kundeid)
);

delete from kunde where kjonn = 'm';

insert into kunde
    (fornavn, etternavn)
    values
    ('ane', 'brun'),
    ('ole', 'olsen');

select fornavn,etternavn from kunde where fornavn ~ 'kri';

update klipp set pris = 200;

select fornavn from forfatter;

select f.navn,b.tittel from 
forfatter f
-- Forfatter kalles nå f, lokalt
inner join 
bok b 
-- bok blir nå referert til som b, gjelder lokalt
on (b.fid=f.fid);

select romnavn from 
rom r 
inner join 
overnatting o 
on (o.romid = r.romid)
where betalt=0 and royk=true

create table passasjer(
    passasjerid serial primary key,
    navn text not null,
    adresse text
);
create table fly(
    flyid serial primary key,
    regnr text not null,
    selskap text,
    flytype text

);
create table flytur(
    flyturid serial primary key,
    pris int,
    avgang date,
    destinasjon text,
    flyid int references fly (flyid),
    passasjerid int references passasjer (passasjerid)
);


delete from passasjer;

delete from fly where flyid > 136;

insert into passasjer (navn) values ('Kåre Hansen'), ('Per Hansen'), ('Ola Nordmann'), ('Per Persson'), ('Svein Isdahl');

select p.*, f.regnr
from flytur ft
inner join passasjer p
on (p.passasjerid = ft.flyturid)
inner join fly f
on (f.flyid = ft.flyturid);



bruk nøkler i inner join for å linke sammen alle tables,
så kun selecte lnavn og fnavn where fnavn ='leo'. Omtrentlig kode som mangler en del: 

select laaner.lnavn, forfatter.fnavn
from laaner
inner join laaner
on (id = id)
inner join utlaan
on (id = id)
inner join eksemplar
on (id = id)
inner join bok
on (id = id)
inner join forfatter
on (id = id)
where forfatter.fnavn = 'leo';

