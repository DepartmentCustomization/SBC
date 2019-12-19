-- declare @Id int = 2;

declare @last_KM int = (
select run_km from RunCar 
where car_id = @Id 
and create_date = 
(select MAX(create_date) from RunCar where car_id = @Id) 
)

Select 
Id,
cars_name,
cars_number,
cars_mark,
cars_year,
@last_KM cars_run

from Cars 
where Id = @Id