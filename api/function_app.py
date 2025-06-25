import azure.functions as func
import logging
import json
import os
from azure.cosmos import CosmosClient, exceptions

app = func.FunctionApp()

@app.function_name(name="GetResumeCounter")
@app.route(route="GetResumeCounter", methods=["GET", "POST"], auth_level=func.AuthLevel.ANONYMOUS)
def get_resume_counter(req: func.HttpRequest) -> func.HttpResponse:
    
    logging.info('=== COSMOS DB WITH GLOBAL INSTALL ===')

    try:
        # Get connection string from environment
        connection_string = os.environ.get('AzureResumeConnectionString')
        
        if not connection_string:
            raise Exception("Connection string not found")
        
        # Create Cosmos DB client
        client = CosmosClient.from_connection_string(connection_string)
        database = client.get_database_client("AzureResume")
        container = database.get_container_client("Counter")
        
        logging.info('✅ Connected to Cosmos DB successfully')
        
        # Try to read current counter document
        try:
            item = container.read_item(item="1", partition_key="1")
            current_count = item.get('count', 0)
            logging.info(f'📖 Found existing count: {current_count}')
        except exceptions.CosmosResourceNotFoundError:
            current_count = 0
            logging.info('📖 No existing document found, starting from 0')
        
        # Increment count
        new_count = current_count + 1
        
        # Create/update the document
        new_item = {
            "id": "1",
            "count": new_count
        }
        
        container.upsert_item(new_item)
        logging.info(f'💾 Successfully saved new count: {new_count}')
        
        # Return response
        response_data = {
            "id": "1", 
            "count": new_count,
            "status": "cosmos_db_working_globally"
        }
        
        return func.HttpResponse(
            json.dumps(response_data),
            status_code=200,
            headers={
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        )
        
    except Exception as e:
        logging.error(f'❌ COSMOS DB ERROR: {str(e)}')
        
        return func.HttpResponse(
            json.dumps({
                "id": "1", 
                "count": 9999, 
                "status": "cosmos_db_error",
                "error": str(e)
            }),
            status_code=200,
            headers={
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        )

@app.function_name(name="HandleCors")
@app.route(route="GetResumeCounter", methods=["OPTIONS"], auth_level=func.AuthLevel.ANONYMOUS)
def handle_cors(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse(
        "",
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS", 
            "Access-Control-Allow-Headers": "Content-Type"
        }
    )
