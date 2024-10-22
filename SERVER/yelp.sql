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