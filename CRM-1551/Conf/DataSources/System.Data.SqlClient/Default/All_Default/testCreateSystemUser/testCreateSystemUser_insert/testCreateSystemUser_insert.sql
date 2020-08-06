declare @output table (Id int)
declare @new_id int;

INSERT INTO dbo.TestCreateSystemUser (
    FirstName,
    LastName,
    Patronymic,
    UseEDS,
    INN,
    Avatar,
    Active,
    PhoneNumber,
    DashboardPageCode,
    SystemUser    
)

output inserted.Id into @output(Id)

VALUES (
    @FirstName,
    @LastName,
    @Patronymic,
    @UseEDS,
    @INN,
    @Avatar,
    @Active,
    @PhoneNumber,
    @DashboardPageCode,
    @SystemUser
)

set @new_id = (select top 1 Id from @output)
select @new_id Id
return;



--и добавь параметр @Id и сделай его ключем