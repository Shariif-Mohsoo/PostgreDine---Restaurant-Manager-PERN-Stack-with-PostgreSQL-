-- creating the restaurants table.
create table restaurants(
    -- automatically incremented and is primary key
    id bigserial primary key,
    -- setting null constraint
    name varchar(50) not null,
    -- setting null constraint
    location varchar(50) not null,
    -- setting check constraint and null constraint
    price_range int not null check(price_range >= 1 and price_range <=5)
);
-- testing data
INSERT INTO restaurants(id,name,location,price_range) VALUES (123,'MONAL','PAKISTAN',3);
-- CREATING A TABLE FOR RATING.
create table reviews(
    id bigserial primary key,
    -- defining the relationship with restaurants table.
    restaurant_id bigint not null references restaurants(id),
    name varchar(50) not null,
    review text not null,
    rating integer not null check(rating >= 1 and rating <=5) 
);
-- TESTING 
insert into reviews(restaurant_id,name,review,rating) values(5,'Mohsoo','Really awesome .....',4);
insert into reviews(restaurant_id,name,review,rating) values(5,'Jawad','Really awesome .....',4);
insert into reviews(restaurant_id,name,review,rating) values(5,'Imran','Really awesome .....',4);


-- finding the constraint name for reviews table and constraint type foreign key
select constraint_name 
from information_schema.table_constraints 
where table_name = 'reviews' and constraint_type = 'FOREIGN KEY';
-- constraint_name
-- ----------------------------
--  reviews_restaurant_id_fkey

-- dropping the constraint we get
alter table reviews
drop constraint reviews_restaurant_id_fkey;

-- Cascade delete is a feature in relational databases that automatically removes related records 
-- from a child table when a record in the parent table is deleted. 
-- This is useful for maintaining data integrity and ensuring that 
-- there are no orphaned records (records that refer to a parent record that no longer exists).
alter table reviews
add constraint reviews_restaurant_id_fkey
foreign key(restaurant_id) 
references restaurants(id) 
on delete cascade;
