/*
declare @AppealFromSite_Id_Search int =11;
declare @AppealFromSite_Id int; -- = 39
declare @BuildingId int;-- = 5986
declare @Flat int;-- = 4
*/
/*
--Жилянська (Жаданівського) 47
select * from Buildings where id = 5986
select * from Streets where id = 792
*/ 

DECLARE @phone_table TABLE (phone nvarchar(40));
DECLARE @mail nvarchar(150)


IF @AppealFromSite_Id IS NULL AND @BuildingId IS NULL AND @Flat IS NULL
	 BEGIN
			INSERT INTO @phone_table (phone)
		  SELECT ApplicantPhones.phone_number
		  FROM [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
		  INNER JOIN [CRM_1551_Analitics].[dbo].[Appeals] ON [AppealsFromSite].Appeal_Id=[Appeals].Id
		  INNER JOIN [CRM_1551_Analitics].[dbo].Applicants ON [Appeals].applicant_id=Applicants.Id
		  INNER JOIN [CRM_1551_Analitics].[dbo].ApplicantPhones ON Applicants.Id=ApplicantPhones.applicant_id
		  WHERE [AppealsFromSite].Id=@AppealFromSite_Id_Search

		  

		IF NOT EXISTS (SELECT TOP 1 phone FROM @phone_table)
			BEGIN
				SET @mail=(
					  SELECT Applicants.mail
					  FROM [CRM_1551_Site_Integration].[dbo].[AppealsFromSite]
					  INNER JOIN [CRM_1551_Analitics].[dbo].[Appeals] ON [AppealsFromSite].Appeal_Id=[Appeals].Id
					  INNER JOIN [CRM_1551_Analitics].[dbo].Applicants ON [Appeals].applicant_id=Applicants.Id
					  --LEFT JOIN [CRM_1551_Analitics].[dbo].ApplicantPhones ON Applicants.Id=ApplicantPhones.applicant_id
					  WHERE [AppealsFromSite].Id=@AppealFromSite_Id_Search)

					  SELECT DISTINCT Id, N'E' as [TypeSearch], [full_name] [PIB]
					  FROM [CRM_1551_Analitics].[dbo].Applicants
					  WHERE mail=@mail
					  AND #filter_columns#
					  #sort_columns#
			--order by 1
					  offset @pageOffsetRows rows fetch next @pageLimitRows rows only
			END
		ELSE
			BEGIN
				SELECT DISTINCT [Applicants].Id, N'T' as [TypeSearch], [Applicants].full_name [PIB]
		  FROM [CRM_1551_Analitics].[dbo].[Applicants]
		  INNER JOIN [CRM_1551_Analitics].[dbo].[ApplicantPhones] ON [Applicants].Id=[ApplicantPhones].applicant_id
		  INNER JOIN @phone_table pt ON [ApplicantPhones].phone_number=pt.phone
		  WHERE #filter_columns#
		  #sort_columns#
			--order by 1
		  offset @pageOffsetRows rows fetch next @pageLimitRows rows only
			END
	 END

	 ELSE
		BEGIN
			select  * from
			(
			  SELECT  [Applicants].[Id],
					  N'О' as [TypeSearch],
					  [Applicants].[full_name] as [PIB]
			  FROM [dbo].[LiveAddress]
			  left join [dbo].[Applicants] on [Applicants].Id = [LiveAddress].applicant_id
			  where [building_id] = @BuildingId and ([flat] = @Flat or len(isnull(rtrim(@Flat),N'')) = 0)
			union all
			  SELECT  [Applicants].[Id],
					  N'Т' as [TypeSearch],
					  [Applicants].[full_name]
			  FROM [dbo].[ApplicantPhones]
			  left join [dbo].[Applicants] on [Applicants].Id = [ApplicantPhones].[applicant_id]
			  where [ApplicantPhones].[phone_number] in (select right([ApplicantFromSiteMoreContacts].PhoneNumber,10) as [Phone]
														 from [CRM_1551_Site_Integration].[dbo].[AppealsFromSite] 
														 inner join [CRM_1551_Site_Integration].[dbo].[ApplicantsFromSite] on [ApplicantsFromSite].Id = [AppealsFromSite].ApplicantFromSiteId
														 inner join [CRM_1551_Site_Integration].[dbo].[ApplicantFromSiteMoreContacts] on [ApplicantFromSiteMoreContacts].ApplicantFromSiteId = [ApplicantsFromSite].Id
														 where [AppealsFromSite].Id = @AppealFromSite_Id and [ApplicantFromSiteMoreContacts].PhoneNumber is not null)

			) as t1
				where  #filter_columns#
				group by [Id], [TypeSearch], [PIB]
				#sort_columns#
				--order by 1
			offset @pageOffsetRows rows fetch next @pageLimitRows rows only

	END