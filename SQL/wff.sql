select tannlege.fornavn, avg(behandling.tannlegeid)
from behandling
inner join tannlege on (tannlege.tannlegeid=behandling.tannlegeid)
group by tannlege.fornavn;



select avg(antall)  
from (select count(tannlegeid) as antall from behandling) behandling;
