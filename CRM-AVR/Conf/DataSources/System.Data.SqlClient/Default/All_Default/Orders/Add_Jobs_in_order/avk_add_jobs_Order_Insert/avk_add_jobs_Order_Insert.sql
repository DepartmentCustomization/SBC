-- declare @job_id int = 26600
-- declare @order_id int = 6520
IF len(isnull(rtrim(@job_id), N'')) > 0 BEGIN IF @job_id NOT IN (
	SELECT
		Job_id
	FROM
		dbo.[Order_Jobs]
	WHERE
		Order_id = @order_id
) BEGIN IF @is_main = 1 BEGIN
UPDATE
	dbo.[Order_Jobs]
SET
	Is_main = 0
WHERE
	Order_id = @order_id;

END

INSERT INTO
	dbo.[Order_Jobs] (
		Order_id,
		Job_id,
		Is_main,
		Is_driver,
		user_edit_id
	)
VALUES
	(
		@order_id,
		@job_id,
		@is_main,
		@is_driver,
		@user_edit_id
	);
END
END

SELECT
	@order_id;

	RETURN;