declare @t table
(r int,
ord_id int)

insert into @t
(r, ord_id)

select ROW_NUMBER() OVER(ORDER BY id ASC), id from
(
select DISTINCT Orders.id FROM  
	Moves 
	inner join Orders on Moves.Orders_Id = Orders.Id
	left join Mechanisms on Mechanisms.Id = Moves.Mechanism_ID
	where Claim_ID = @claim_id and Mechanisms.Id is not null
) a 


SELECT Moves.[Id]
	  ,Mechanisms.Name as mechanisms_name
	  ,Mechanism_types.Name as mechanisms_type_name
	  ,Moves.Departure_at
	  ,Mechanisms.Number as state_number
      ,t.r  Order_Number
	    
  FROM  Moves 
	left join Orders on Moves.Orders_Id = Orders.Id
	left join Mechanisms on Mechanisms.Id = Moves.Mechanism_ID
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
	left join @t t on t.ord_id = Orders.Id
WHERE Mechanisms.Id is not null and Orders.Claim_id = @claim_id
order by t.r