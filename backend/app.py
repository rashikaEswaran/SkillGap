import os
from slm_server import app

if __name__ == "__main__":
    # Hugging Face spaces route traffic to port 7860
    port = int(os.environ.get("PORT", 7860))
    app.run(host="0.0.0.0", port=port, debug=False)
