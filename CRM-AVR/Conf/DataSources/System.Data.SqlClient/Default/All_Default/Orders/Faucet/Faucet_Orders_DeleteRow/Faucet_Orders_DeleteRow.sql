-- @Id INT = 2125;

DECLARE @ClaimID INT = (SELECT Claim_ID FROM dbo.Faucet WHERE Id = @Id);
DECLARE @Having_Disconnexion BIT = (SELECT  
                                          CASE 
										    WHEN COUNT(1) > 0 
										    THEN 1
										    ELSE 0 
										  END
                                    FROM dbo.Claim_SwitchOff_Address 
									WHERE Faucet_ID = @Id);


DECLARE @ClaimStatus TINYINT = (SELECT Status_ID FROM dbo.Claims WHERE Id = @ClaimID);
---> Если по зусувке нету отключений и заявка не закрыта - то можно выполнять удаление
IF (@Having_Disconnexion = 0) AND (@ClaimStatus <> 5)
 BEGIN

       DELETE
       FROM dbo.Faucet
       WHERE Id = @Id ;

 END
---> Если по засувке есть отключение и заявка не закрыта
ELSE IF (@Having_Disconnexion = 1) AND (@ClaimStatus <> 5)
 BEGIN
    RAISERROR('УВАГА! Не можна видаляти запірну арматуру, бо по ній є відключення!',16,1);
  END
--->  Если по засувке есть отключения или нету, а заявка закрыта
ELSE IF ( @Having_Disconnexion = 1 OR @Having_Disconnexion = 0 ) AND (@ClaimStatus = 5)
 BEGIN
 	RAISERROR('Заявку закрито, видалення заборонено',16,1);
  END
