Distinct:
	Select distinct col1, col2 from table;
Limit:
	Select col from table limit 5;
Order by:
	Select * from col order by navn;
Where:
	Select col from table where condition;
	=, !=, > <,>=,<=, between
And/or:
	Select id, col from customer where age >=30;
	Select id, col from customer where age = 31 or 30;
    Select * from customers where city = 'new york' and (Age=30 or age =35);
IN/not:
    select * from customers where city in ('New York','LA','Chicago');
    select * from customers where city not in ('New York','LA','Chicago');
concatenate: 
    select concatenate(navn, '', etternavn) as new_column from customer;



