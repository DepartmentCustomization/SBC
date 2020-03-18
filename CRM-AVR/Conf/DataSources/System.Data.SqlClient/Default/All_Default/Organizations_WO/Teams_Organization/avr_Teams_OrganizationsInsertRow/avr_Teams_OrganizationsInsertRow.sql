

INSERT INTO [dbo].[Teams]
           (
           [Name]
           ,[Organization_ID]
           ,[Plan_start_time]
           ,[Plan_end_time]
           )
     VALUES
           
          (
          @teams_name
           ,@organizations_id
           ,@Plan_start_time
        --   ,DATEADD(hh, -1, @Plan_start_time)
           , @Plan_end_time
        --   ,DATEADD(hh, -1, @Plan_end_time)
           )