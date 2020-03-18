

if @ContactId = 0
begin
    if @PlaceId = 0
    begin
select distinct 
N'+ 1' as [AddAppeal]
, Claims.Id as [Заявка]
,Claim_types.Id as [Тип_Id]
,Claim_types.Name as [Тип]
,Places.Id as [Місце_Id]
,Places.Name as [Місце]
,Claims.Created_at as [Створена]
,Claims.Plan_finish_at as [План виконання]
,Contacts.Id as [Заявник_Id]
,Contacts.Name as [Заявник]
from Claims
left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
--left join Actions on Actions.Claim_ID = Claims.Id
--left join Places on Places.Id = Actions.Place_ID
left join Appeals on Appeals.Claim_ID = Claims.Id
left join Contacts on Contacts.Id = Appeals.Contact_ID
left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
left join Places on Places.Id = Claim_Order_Places.Place_ID
where Claim_Order_Places.Is_first_place = 1
and Claims.Status_ID in (1,2,3)
and Places.Id in
		(select distinct 
		Places.Id 
		from Claims
		left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
		--left join Actions on Actions.Claim_ID = Claims.Id
		--left join Places on Places.Id = Actions.Place_ID
		left join Appeals on Appeals.Claim_ID = Claims.Id
		left join Contacts on Contacts.Id = Appeals.Contact_ID
		left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
		left join Places on Places.Id = Claim_Order_Places.Place_ID
		where Claim_Order_Places.Is_first_place = 1
		and Claims.Status_ID in (1,2,3) )
order by Claims.Created_at
    end
    else
    begin
select distinct 
N'+ 1' as [AddAppeal]
, Claims.Id as [Заявка]
,Claim_types.Id as [Тип_Id]
,Claim_types.Name as [Тип]
,Places.Id as [Місце_Id]
,Places.Name as [Місце]
,Claims.Created_at as [Створена]
,Claims.Plan_finish_at as [План виконання]
,Contacts.Id as [Заявник_Id]
,Contacts.Name as [Заявник]
from Claims
left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
--left join Actions on Actions.Claim_ID = Claims.Id
--left join Places on Places.Id = Actions.Place_ID
left join Appeals on Appeals.Claim_ID = Claims.Id
left join Contacts on Contacts.Id = Appeals.Contact_ID
left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
left join Places on Places.Id = Claim_Order_Places.Place_ID
where Claim_Order_Places.Is_first_place = 1
and Claims.Status_ID in (1,2,3)
and Places.Id in
		(select distinct 
		Places.Id 
		from Claims
		left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
		--left join Actions on Actions.Claim_ID = Claims.Id
		--left join Places on Places.Id = Actions.Place_ID
		left join Appeals on Appeals.Claim_ID = Claims.Id
		left join Contacts on Contacts.Id = Appeals.Contact_ID
		left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
		left join Places on Places.Id = Claim_Order_Places.Place_ID
		where Claim_Order_Places.Is_first_place = 1
		and Claims.Status_ID in (1,2,3) and Places.Id = @PlaceId)
order by Claims.Created_at    
    end
end
else 
begin
    if @PlaceId = 0
    begin
select distinct 
N'+ 1' as [AddAppeal]
, Claims.Id as [Заявка]
,Claim_types.Id as [Тип_Id]
,Claim_types.Name as [Тип]
,Places.Id as [Місце_Id]
,Places.Name as [Місце]
,Claims.Created_at as [Створена]
,Claims.Plan_finish_at as [План виконання]
,Contacts.Id as [Заявник_Id]
,Contacts.Name as [Заявник]
from Claims
left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
--left join Actions on Actions.Claim_ID = Claims.Id
--left join Places on Places.Id = Actions.Place_ID
left join Appeals on Appeals.Claim_ID = Claims.Id
left join Contacts on Contacts.Id = Appeals.Contact_ID
left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
left join Places on Places.Id = Claim_Order_Places.Place_ID
where Claim_Order_Places.Is_first_place = 1
and Claims.Status_ID in (1,2,3)
and Places.Id in
		(select distinct 
		Places.Id 
		from Claims
		left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
		--left join Actions on Actions.Claim_ID = Claims.Id
		--left join Places on Places.Id = Actions.Place_ID
		left join Appeals on Appeals.Claim_ID = Claims.Id
		left join Contacts on Contacts.Id = Appeals.Contact_ID
		left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
		left join Places on Places.Id = Claim_Order_Places.Place_ID
		where Claim_Order_Places.Is_first_place = 1
		and Claims.Status_ID in (1,2,3)
		and Contacts.Id = @ContactId )
order by Claims.Created_at
    end
    else
    begin
select distinct 
N'+ 1' as [AddAppeal]
, Claims.Id as [Заявка]
,Claim_types.Id as [Тип_Id]
,Claim_types.Name as [Тип]
,Places.Id as [Місце_Id]
,Places.Name as [Місце]
,Claims.Created_at as [Створена]
,Claims.Plan_finish_at as [План виконання]
,Contacts.Id as [Заявник_Id]
,Contacts.Name as [Заявник]
from Claims
left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
--left join Actions on Actions.Claim_ID = Claims.Id
--left join Places on Places.Id = Actions.Place_ID
left join Appeals on Appeals.Claim_ID = Claims.Id
left join Contacts on Contacts.Id = Appeals.Contact_ID
left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
left join Places on Places.Id = Claim_Order_Places.Place_ID
where Claim_Order_Places.Is_first_place = 1
and Claims.Status_ID in (1,2,3)
and Places.Id in
		(select distinct 
		Places.Id 
		from Claims
		left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
		--left join Actions on Actions.Claim_ID = Claims.Id
		--left join Places on Places.Id = Actions.Place_ID
		left join Appeals on Appeals.Claim_ID = Claims.Id
		left join Contacts on Contacts.Id = Appeals.Contact_ID
		left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
		left join Places on Places.Id = Claim_Order_Places.Place_ID
		where Claim_Order_Places.Is_first_place = 1
		and Claims.Status_ID in (1,2,3)
		and Contacts.Id = @ContactId and Places.Id = @PlaceId)
order by Claims.Created_at
    end
end