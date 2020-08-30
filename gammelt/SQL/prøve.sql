-- virker:
insert into kunde (fornavn,etternavn,adresse) values ('ole','olsen','Bergen');
insert into kunde (fornavn,etternavn,adresse) values ('ole','olsen','Bergen'),('anne','olsen','Os');
--virker ikke:
insert into kunde (fornavn) values ('ole'),('anne'),('lise');
insert into kunde (fornavn,etternavn,adresse);



CREATE TABLE linje
(
  linjeid serial primary key,
  pris INT NOT NULL,
  antall INT default 1,
  bestillingid INT NOT NULL,
  vareid INT NOT NULL,
  FOREIGN KEY (bestillingid) REFERENCES bestilling(bestillingid),
  FOREIGN KEY (vareid) REFERENCES vare(vareid)
);

Slette alle linjer:
  delete from linje;
  delete from linje where pris is not null;
--delete from linje where bestillngsid = vareid;
--delete from linje where pris > 0;

CREATE TABLE vare
(
  vareid serial primary key,
  varenavn text not null,
  beholdning INT default 0,
  basispris INT NOT NULL
);

Hvilken vil øke basispris med 20%

--update vare set basispris = 20%;
  update vare set basispris = basispris * 1.2;
--update vare where basispris is 20% more;

CREATE TABLE kunde
(
  kundeid serial primary key,
  fornavn text not null,
  etternavn text not null,
  adresse text not null,
  tlf text default '',
  epost text default ''
);

Hvilken spørring finner kunder som mangler epost
--delete from kunde where epost mangler;
--select * from kunde where no epost;
select * from kunde where epost = '';
--insert from kunde where epost is missing;

CREATE TABLE kunde
(
  kundeid serial primary key,
  fornavn text not null,
  etternavn text not null,
  adresse text not null,
  tlf text default '',
  epost text default ''
);

Hvilken spørring finner kunder som mangler epost eller bor på Karmøy

--select kunde where epost is null on 'Karmøy';
select * from kunde where adresse='Karmøy' or epost = '';
--select * from kunde where adresse='Karmøy' and epost is null;

CREATE TABLE k
(
  kid serial primary key,
  fornavn text not null,
  etternavn text not null,
  adresse text not null,
  tlf text default '',
  epost text default ''
);

CREATE TABLE b
(
  bid serial primary key,
  dato DATE NOT NULL,
  betalt boolean default false,
  betalingsmetode text not null,
  kid INT NOT NULL,
  FOREIGN KEY (kid) REFERENCES kunde(kid)
);

Finn alle bestillinger for kunder som bor i Oslo.
--select b.* from b,k inner join on (b.kid = k.kid) where k.adresse = 'Oslo';
select b.*,k.* from b inner join k on (b.kid = k.kid) where k.adresse = 'Oslo';
--select b.* from b inner join k on (b = k) where k.adresse = 'Oslo';

