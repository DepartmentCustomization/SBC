 insert into [CRM_AVR_System].[dbo].[UserInOrganisation] ([OrganisationStructureId],[UserId],JobTitle)
  values (
      @Type_name
    , @SystemUser_Id
    , @Job_name
  )