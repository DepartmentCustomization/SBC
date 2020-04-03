 --DECLARE @org_id INT = 6204;
 --DECLARE @date DATE = '2020-01-31';

SELECT [Shifts_Person].[Id]
      ,[Shifts_Person].[Job_Id]
	  ,CONCAT(Contacts.[Name], ' ( ' + Jobs.Job_name + ')') AS pib_position
      ,[Shifts_Person].[Shift_date]
      ,[Shifts_Person].[Plan_start_time]
      ,[Shifts_Person].[Plan_end_time]
  FROM [dbo].[Shifts_Person]
	left join Jobs ON Jobs.Id = [Shifts_Person].Job_Id
	left join Contacts ON Contacts.[external_Id] = Jobs.[Contacts_ID]

 WHERE Jobs.Organization_ID = @org_id 
 AND [Shifts_Person].Shift_date =  CONVERT(DATE, @date )
 AND [Shifts_Person].Time_count IS NOT NULL
 AND
   #filter_columns#
   #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only  ;