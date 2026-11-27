/********************************************************************************************
  codigo para insertar los correos destinatarios de cobranza para listado ps bloqueados
*******************************************************************************************/

INSERT INTO FICOHSA.DIR_LVAL  (TIPOLVAL , DESCRIP, LONGCOD, TIPOCOD, LONGDESC, TIPOUSO, USOLVAL )
VALUES ('EMAILSPA', 'EMAIL PUNTOS DE SERVICIO PA BLOQUEADOS', 10, 'A', 250, 'G', 'PARA ENVIAR CORREO DE PUNTOS DE SERVICIOS BLOQUEADOS' );
  

INSERT INTO FICOHSA.LVAL (TIPOLVAL, CODLVAL, DESCRIP, STATUS  )
VALUES ('EMAILSPA', '01', 'digitadores@segurosamerica.con.ni', '001' );


INSERT INTO FICOHSA.LVAL (TIPOLVAL, CODLVAL, DESCRIP, STATUS  ) VALUES
('EMAILSPA', '02', 'cobranza@segurosamerica.com.ni', '001' );


INSERT INTO FICOHSA.LVAL (TIPOLVAL, CODLVAL, DESCRIP, STATUS  ) VALUES
('EMAILSPA', '03', 'cobranzapuntoamerica@segurosamerica.com.ni', '001' );


COMMIT;
