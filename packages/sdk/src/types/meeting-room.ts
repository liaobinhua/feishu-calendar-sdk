export interface MeetingRoom {
  room_id: string;
  name: string;
  building_id: string;
  floor_id: string;
  capacity: number;
  facilities: string[];
}

export interface ListMeetingRoomsRequest {
  building_id?: string;
  floor_id?: string;
  page_size?: number;
  page_token?: string;
}

export interface ListMeetingRoomsResponse {
  items: MeetingRoom[];
  page_token?: string;
}
