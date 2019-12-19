-- declare @Id int = 2;

declare @current_month tinyint = (select month(current_timestamp));
declare @current_year int = (select year(current_timestamp));

declare @onMonthStart int;
declare @onMonthEnd int;
declare @monthKm int;

set @onMonthStart = 
(
select top 1
    run_km
from RunCar
where car_id = @Id
    and year(create_date) = @current_year
    and month(create_date) = @current_month
    and day(create_date) between 1 and 5 );

set @onMonthEnd = 
(
select top 1
    run_km
from RunCar
where car_id = @Id
    and year(create_date) = @current_year
    and month(create_date) = @current_month
    and day(create_date) between 25 and 31);

set @monthKm = @onMonthEnd - @onMonthStart

Select
    @onMonthStart as 'Начало месяца', @onMonthEnd as 'Конец месяца', @monthKm as 'За месяц'
where
 #filter_columns#
 #sort_columns#
 
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only