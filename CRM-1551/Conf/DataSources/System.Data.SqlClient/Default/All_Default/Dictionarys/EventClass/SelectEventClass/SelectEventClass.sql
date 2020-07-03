select ec.Id, ec.name, ec.global_id, gt.name as globalType, 
ec.event_type_id as eventClassTypeId,
et.name as eventClassTypeName
,ec.[assignment_class_id]
,[Assignment_Classes].name [assignment_class_name]
,[Assignment_Classes].execution_term
from Event_Class ec
join EventTypes et on et.id = ec.event_type_id
left join [CRM_1551_GORODOK_Integrartion].[dbo].[Global_claims_types_new] 
left join [dbo].[Assignment_Classes] on ec.[assignment_class_id]=[Assignment_Classes].Id
gt on ec.global_id = gt.id 
where ec.Id = @Id;