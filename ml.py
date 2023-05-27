from http.server import BaseHTTPRequestHandler, HTTPServer
import json

hostName = "localhost"
serverPort = 8080

class MyServer(BaseHTTPRequestHandler):
    
    def do_POST(self):
         
        self.send_response(200)
        
        # Set headers
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        # content_len = int(self.headers.get_all())
        
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        json_data = json.loads(post_data.decode('utf-8'))
         
        # Process the request data
        # Here, we simply echo back the received data in the response
        response = post_data.decode('utf-8')
        
        # Send the response
        self.wfile.write(response.encode('utf-8'))
if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")