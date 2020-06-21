/*
 * @Author: Jean Amadeu
 * @Last Modified by:   Jean Amadeu
 */

export default interface ICreateAssetDTO {
  partnumber: string;
  serie: string;
  status:
    | 'RAA'
    | 'REPAIR'
    | 'ANALISYS_PENDING'
    | 'IN_TRANSIT'
    | 'DEPLOYED'
    | 'PENDING_GARS'
    | 'SCRAP'
    | 'GARS';
  site_id: number;
}
