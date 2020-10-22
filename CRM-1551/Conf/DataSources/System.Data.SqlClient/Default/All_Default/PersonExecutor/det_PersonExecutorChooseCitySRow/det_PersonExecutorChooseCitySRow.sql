select [PersonExecutorChoose].Id, 
  [PersonExecutorChoose].Id person_executor_choose_id, [PersonExecutorChoose].name person_executor_choose_name,
  [PersonExecutorChooseObjects].city_id, 
  [PersonExecutorChooseObjects].city_name
  from [dbo].[PersonExecutorChoose]
  left join (select distinct person_executor_choose_id, (select Id from [dbo].[City]) city_id, (select name from [dbo].[City]) city_name
  from [dbo].[PersonExecutorChooseObjects] where object_id is not null) [PersonExecutorChooseObjects] on [PersonExecutorChoose].Id=[PersonExecutorChooseObjects].person_executor_choose_id
where [PersonExecutorChoose].Id=@Id