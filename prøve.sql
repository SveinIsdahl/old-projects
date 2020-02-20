1
select * from kunde k
inner join behandling b on (k.kundeid = b.kundeid)
where betalt = 0
order by etternavn,fornavn;
2
SELECT * FROM
(select customer.cust_num, customer.cust_bizname,
  COUNT(invoice.inv_num) AS "TOTAL ORDERS"
FROM customer INNER JOIN invoice ON customer.cust_num = invoice.cust_num
GROUP BY customer.cust_num, customer.cust_bizname
ORDER BY "TOTAL ORDERS" desc)
WHERE rownum = 1;
3
Select avg(last_10_count) AS last_10_avg
(Select count(*)
from dim_user
where effective_date ::date > current_date -10
group by effective_date ::date) AS last_10_count
4
delete from kunde where kunde.fornavn ~ 'fred';