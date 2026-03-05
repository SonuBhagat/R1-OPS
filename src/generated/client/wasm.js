
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.BookingsScalarFieldEnum = {
  booking_id: 'booking_id',
  ride_id: 'ride_id',
  booked_by: 'booked_by',
  seats: 'seats',
  fare_amount: 'fare_amount',
  status: 'status',
  rider_confirmed: 'rider_confirmed',
  passenger_confirmed: 'passenger_confirmed',
  created_at: 'created_at',
  is_direct: 'is_direct',
  negotiated_price: 'negotiated_price',
  is_middle_route: 'is_middle_route',
  middle_route_from_text: 'middle_route_from_text',
  middle_route_from_lat: 'middle_route_from_lat',
  middle_route_from_lng: 'middle_route_from_lng',
  middle_route_to_text: 'middle_route_to_text',
  middle_route_to_lat: 'middle_route_to_lat',
  middle_route_to_lng: 'middle_route_to_lng',
  suggested_price: 'suggested_price',
  fare_per_seat: 'fare_per_seat',
  vehicle_type: 'vehicle_type'
};

exports.Prisma.ConversationsScalarFieldEnum = {
  conversation_id: 'conversation_id',
  ride_id: 'ride_id',
  participant1_id: 'participant1_id',
  participant2_id: 'participant2_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  last_message_at: 'last_message_at'
};

exports.Prisma.Device_tokensScalarFieldEnum = {
  user_id: 'user_id',
  token: 'token',
  platform: 'platform',
  created_at: 'created_at'
};

exports.Prisma.Driver_documentsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  type: 'type',
  url: 'url',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Emergency_contactsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  name: 'name',
  phone: 'phone',
  relation: 'relation',
  created_at: 'created_at'
};

exports.Prisma.MessagesScalarFieldEnum = {
  message_id: 'message_id',
  conversation_id: 'conversation_id',
  sender_id: 'sender_id',
  content: 'content',
  is_read: 'is_read',
  created_at: 'created_at',
  type: 'type',
  metadata: 'metadata'
};

exports.Prisma.NotificationsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  type: 'type',
  title: 'title',
  message: 'message',
  data: 'data',
  is_read: 'is_read',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Otp_sessionsScalarFieldEnum = {
  id: 'id',
  phone_number: 'phone_number',
  session_id: 'session_id',
  otp_code: 'otp_code',
  status: 'status',
  attempts: 'attempts',
  created_at: 'created_at',
  expires_at: 'expires_at',
  verified_at: 'verified_at',
  ip_address: 'ip_address',
  user_agent: 'user_agent'
};

exports.Prisma.ReviewsScalarFieldEnum = {
  review_id: 'review_id',
  ride_id: 'ride_id',
  booking_id: 'booking_id',
  reviewer_id: 'reviewer_id',
  reviewed_user_id: 'reviewed_user_id',
  rating: 'rating',
  comment: 'comment',
  tags: 'tags',
  is_rider_review: 'is_rider_review',
  created_at: 'created_at'
};

exports.Prisma.RidesScalarFieldEnum = {
  ride_id: 'ride_id',
  posted_by: 'posted_by',
  type: 'type',
  from_text: 'from_text',
  to_text: 'to_text',
  from_lat: 'from_lat',
  from_lng: 'from_lng',
  to_lat: 'to_lat',
  to_lng: 'to_lng',
  date_time: 'date_time',
  seats: 'seats',
  seats_left: 'seats_left',
  fare_per_seat: 'fare_per_seat',
  vehicle_type: 'vehicle_type',
  status: 'status',
  preferences: 'preferences',
  created_at: 'created_at',
  allow_negotiation: 'allow_negotiation',
  allow_middle_route: 'allow_middle_route',
  estimated_duration_mins: 'estimated_duration_mins',
  effective_expiry: 'effective_expiry'
};

exports.Prisma.Spatial_ref_sysScalarFieldEnum = {
  srid: 'srid',
  auth_name: 'auth_name',
  auth_srid: 'auth_srid',
  srtext: 'srtext',
  proj4text: 'proj4text'
};

exports.Prisma.UsersScalarFieldEnum = {
  id: 'id',
  name: 'name',
  phone: 'phone',
  email: 'email',
  role: 'role',
  rating: 'rating',
  avatar_url: 'avatar_url',
  preferences: 'preferences',
  is_verified: 'is_verified',
  created_at: 'created_at',
  whatsapp_number: 'whatsapp_number',
  notify_whatsapp: 'notify_whatsapp'
};

exports.Prisma.AdminsScalarFieldEnum = {
  id: 'id',
  username: 'username',
  password: 'password',
  name: 'name',
  role: 'role',
  created_at: 'created_at'
};

exports.Prisma.Faq_feedbackScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  faq_question: 'faq_question',
  is_helpful: 'is_helpful',
  created_at: 'created_at'
};

exports.Prisma.Support_ticketsScalarFieldEnum = {
  ticket_id: 'ticket_id',
  user_id: 'user_id',
  category: 'category',
  message: 'message',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  bookings: 'bookings',
  conversations: 'conversations',
  device_tokens: 'device_tokens',
  driver_documents: 'driver_documents',
  emergency_contacts: 'emergency_contacts',
  messages: 'messages',
  notifications: 'notifications',
  otp_sessions: 'otp_sessions',
  reviews: 'reviews',
  rides: 'rides',
  spatial_ref_sys: 'spatial_ref_sys',
  users: 'users',
  admins: 'admins',
  faq_feedback: 'faq_feedback',
  support_tickets: 'support_tickets'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
