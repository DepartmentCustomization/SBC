-- DECLARE @Id INT = 2;

UPDATE dbo.TestCreateSystemUser
SET 
    FirstName = @FirstName,
    LastName = @LastName,
    Patronymic = @Patronymic,
    UseEDS = @UseEDS,
    INN = @INN,
    Avatar = @Avatar,
    Active = @Active,
    PhoneNumber = @PhoneNumber,
    DashboardPageCode = @DashboardPageCode,
    SystemUser = @SystemUser
WHERE Id = @Id;