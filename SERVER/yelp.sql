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