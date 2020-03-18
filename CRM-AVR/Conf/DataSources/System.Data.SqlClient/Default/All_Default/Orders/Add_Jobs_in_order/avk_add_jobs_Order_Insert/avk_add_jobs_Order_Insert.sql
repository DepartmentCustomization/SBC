-- declare @job_id int = 26600
-- declare @order_id int = 6520

IF len(isnull(rtrim(@job_id),N'')) > 0
BEGIN
	if   @job_id not in (select Job_id from Order_Jobs where Order_id = @order_id) 
		begin
			if @is_main = 1
				begin
					update Order_Jobs
						set Is_main = 0
						where Order_id = @order_id
				end

			insert into Order_Jobs
				(
				  Order_id
				 ,Job_id
				 ,Is_main
				 ,Is_driver
				)
				values
				(
				  @order_id
				 ,@job_id
				 ,@is_main
				 ,@is_driver
				)
		end		
END

select  @order_id
		 

return