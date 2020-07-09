export default interface ITransferOutDTO {
  asset_id: string;
  site_origem_id: string;
  site_destination_id: string;
  invoice: string;
  delivered: false;
}
