-- DECLARE @organization_id INT = 6206;

SELECT
      [Jobs].[Id],
      [Job_name],
      [Contacts].Name
FROM
      [dbo].[Jobs] [Jobs]
      LEFT JOIN dbo.[Contacts] [Contacts] ON [Jobs].Contacts_ID = [Contacts].Id
            AND Contact_type_ID = 3
WHERE
      jobs.Organization_ID = @organization_id
      AND Jobs.Is_work = 1;