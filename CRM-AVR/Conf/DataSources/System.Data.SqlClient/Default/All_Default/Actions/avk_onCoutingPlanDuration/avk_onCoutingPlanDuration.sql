--declare @planDuration time(0) 

EXEC CoutingPlanDuration @Value, @action_type , @planDuration  output

select @planDuration as planDuration