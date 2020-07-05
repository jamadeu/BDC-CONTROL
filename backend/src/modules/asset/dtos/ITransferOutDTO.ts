export default interface ITransferOutDTO {
  asset_id: number;
  site_origem_id: number;
  site_destination_id: number;
  invoice: string;
  sla: 'GREEN';
}
