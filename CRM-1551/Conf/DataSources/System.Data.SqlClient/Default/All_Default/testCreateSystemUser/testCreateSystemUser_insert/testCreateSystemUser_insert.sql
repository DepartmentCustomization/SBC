
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
