-- DECLARE @Id INT = 9093;

select    
distinct
	 Claim_links.Id   
	,CASE   
         WHEN Claim_links.Claim_link_type_id = 2 and Claim_links.Claim2_ID = @Id THEN Claims.Id
         WHEN Claim_links.Claim_link_type_id = 2 and Claim_links.Claim1_ID = @Id THEN Claims2.Id
         WHEN Claim_links.Claim_link_type_id = 3 and Claim_links.Claim2_ID = @Id THEN Claims.Id
         WHEN Claim_links.Claim_link_type_id = 3 and Claim_links.Claim1_ID = @Id THEN Claims2.Id
         WHEN Claim_links.Claim_link_type_id = 1 and Claim_links.Claim1_ID = @Id THEN Claims2.Id
         ELSE Claims.Id end as claim_Id

	,case when Claim_links.Claim1_ID = @Id 
			then concat('№ '+ convert(nvarchar(10), Claims2.Claim_Number),'; створена: '+ convert(nvarchar(13), Claims2.Created_at, 103),'; статус: '+ Status2.Name,'; тип: ',Cl_type2.Name)
			else concat('№ '+ convert(nvarchar(10), Claims.Claim_Number),'; створена: '+ convert(nvarchar(13), Claims.Created_at, 103),'; статус: '+ Status.Name,'; тип: '+ Claim_types.Name)
	end as pole

	,Claims.Id as claims_id
	, claim_link_types_name =  
      CASE   
         WHEN Claim_links.Claim_link_type_id = 2 and Claim_links.Claim2_ID = @Id THEN 'Утримує' 
         WHEN Claim_links.Claim_link_type_id = 2 and Claim_links.Claim1_ID = @Id THEN 'Утримується' 
         WHEN Claim_links.Claim_link_type_id = 3 and Claim_links.Claim2_ID = @Id THEN 'Батьківська'
         WHEN Claim_links.Claim_link_type_id = 3 and Claim_links.Claim1_ID = @Id THEN 'Породженна'
         ELSE 'Пов`язана'  
      END 
from Claim_links 
	left join Claims on Claims.Id = Claim_links.Claim1_ID --or Claims.Id = Claim_links.Claim2_ID
	left join Claims Claims2 on Claims2.Id = Claim_links.Claim2_ID --or Claims2.Id = Claim_links.Claim1_ID
	left join Claim_link_types on Claim_link_types.Id = Claim_links.Claim_link_type_id
	left join Status on Status.Id = Claims.Status_ID
	left join Status Status2 on Status2.Id = Claims2.Status_ID
	left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
	left join Claim_types Cl_type2 on Cl_type2.Id = Claims2.Claim_type_ID
	left join Claim_links Claim2_links on Claim2_links.Claim1_ID = Claims2.Id 
WHERE Claim_links.Claim1_ID = @Id or Claim_links.Claim2_ID = @Id
and Claims.DisplayID = 2
and
	#filter_columns#
    #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only ;