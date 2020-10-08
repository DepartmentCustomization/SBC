SELECT [Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[Id]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[Date_Start] as [Date_Start]
	  ,[Rating].[Id] as [RatingId]
	  ,[Rating].[name] as [RatingName]
	  ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k1_name]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k1_value]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k1_isUse]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k2_name]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k2_value]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k2_isUse]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k3_name]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k3_value]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k3_isUse]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k4_name]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k4_value]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k4_isUse]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k5_name]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k5_value]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k5_isUse]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k6_name]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k6_value]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k6_isUse]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k7_name]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k7_value]
      ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[k7_isUse]
	  ,[RatingFormulas].[Id] as  [formula_id]
	  ,[RatingFormulas].[name] as [formula_name]	
	  ,[RatingFormulas].[content] as [RatingFormulaContent]	
	  ,[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[comment] as [comment]
  FROM [dbo].[Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel]
  inner join [dbo].[RatingFormulas] on [RatingFormulas].[Id] = [Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[formula_id]
  inner join [CRM_1551_Analitics].[dbo].[Rating] on [Rating].[Id] = [Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[RatingId]
  left join [CRM_1551_System].[dbo].[User] on [Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[CreatedUserById] = [User].UserId collate Ukrainian_CI_AS
  where [Rating_ReferenceWeight_IntegratedMetric_PerformanceLevel].[Id] = @Id