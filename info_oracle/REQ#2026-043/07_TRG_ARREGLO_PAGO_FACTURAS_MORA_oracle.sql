CREATE OR REPLACE NONEDITIONABLE TRIGGER FICOHSA.TRG_ARREGLO_PAGO_FACTURAS_MORA
AFTER INSERT ON FICOHSA.ARREGLO_PAGO_FACTURAS_MORA
FOR EACH ROW
DECLARE
        v_nuevo_estado FICOHSA.ARREGLO_PAGO_FACTURAS_MORA.ESTADO%TYPE;
        V_CODPUNTOSERVICIO NUMBER;
        V_ID_ARREGLO NUMBER;
BEGIN-- Solo actuar si el registro trae un estado_nuevo v�lido

        IF :NEW.estado IS NULL THEN
           RETURN;
         END IF;

      -- Actualizar el estado del punto de SERVICIO
      v_nuevo_estado     := :NEW.estado;
      V_CODPUNTOSERVICIO := :NEW.codpuntoservicio;
      V_ID_ARREGLO       := :NEW.id_arreglo;

       IF  UPPER(v_nuevo_estado) = 'ACTIVO' THEN

                 UPDATE BLOQUEO_PUNTOS_SERVICIO_PA
                    SET estado = 'DESBLOQUEADO' , activo = 'INA'
                  WHERE codpuntoservicio = V_CODPUNTOSERVICIO
                    AND ACTIVO = 'ACT';

         IF SQL%ROWCOUNT > 0 THEN
                 INSERT INTO HISTORICO_BLOQ_DESBLOQ_PS_PA (
                              cod_punto_servicio,
                              estado_anterior,
                              estado_nuevo,
                              motivo,
                              usuario_bd ,
                              HORA_ACCION,
                              ORIGEN

                     )  VALUES (
                           V_CODPUNTOSERVICIO,
                           'INA',
                           'ACT',
                           'Desbloqueo por arreglo de pago , ID ARREGLO NRO. : ' || to_char(V_ID_ARREGLO ),
                           user,
                           to_char(SYSTIMESTAMP,'HH24:MI:SS'),
                           'TRIGGER_ARREGLO'

                    );
         END IF;
       END IF;
END;
/
