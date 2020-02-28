-- DECLARE @Id INT = 104;

DECLARE @OrderID INT = (SELECT Order_id FROM dbo.Order_Jobs WHERE Id = @Id);
DECLARE @ClaimID INT = (SELECT Claim_ID FROM dbo.Orders WHERE Id = @OrderID);

DECLARE @OrderStatus TINYINT = (SELECT Status_ID FROM dbo.Orders WHERE Id = @OrderID);
DECLARE @ClaimStatus TINYINT = (SELECT Status_ID FROM dbo.Claims WHERE Id = @ClaimID);
---> Если заявка и выезд не закрыто
IF (@OrderStatus <> 10) AND (@ClaimStatus <> 5)
 BEGIN

       DELETE
       FROM dbo.Order_Jobs
       WHERE Id = @Id ;

 END
---> Если выезд закрыт, а заявка нет
ELSE IF (@OrderStatus = 10) AND (@ClaimStatus <> 5)
 BEGIN
    RAISERROR('УВАГА! Виїзд закрито, видалення заборонено.',16,1);
  END
--->  Если заявка закрыта
ELSE IF (@ClaimStatus = 5)
 BEGIN
 	RAISERROR('УВАГА! Заявку закрито, видалення заборонено',16,1);
  END
