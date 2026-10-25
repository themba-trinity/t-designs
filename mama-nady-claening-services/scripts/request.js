
supabaseClient.from('employer_requests').insert([{
    name: reqName, phone: reqPhone, email: reqEmail,
    location: reqLocation, service_type: reqService, message: reqMessage
}]);
